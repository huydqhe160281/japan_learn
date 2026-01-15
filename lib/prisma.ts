import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

// Singleton pattern cho Prisma Client để tránh tạo nhiều instance
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  pool: Pool | undefined;
};

// Hàm tạo Prisma Client với connection pool
function getPrismaClient(): PrismaClient {
  // Nếu đã có instance và còn hoạt động, trả về ngay
  if (globalForPrisma.prisma) {
    return globalForPrisma.prisma;
  }

  // Kiểm tra DATABASE_URL
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error(
      "DATABASE_URL không được tìm thấy trong environment variables. " +
        "Vui lòng kiểm tra file .env và đảm bảo DATABASE_URL đã được cấu hình.",
    );
  }

  // Tạo hoặc tái sử dụng connection pool
  // Với Neon pooler, chúng ta cần cấu hình pool nhỏ và đơn giản
  let pool = globalForPrisma.pool;

  if (!pool) {
    pool = new Pool({
      connectionString: databaseUrl,
      // Với Neon pooler, chỉ cần pool nhỏ
      max: 1, // Giảm xuống 1 để tránh connection issues
      min: 0, // Cho phép đóng connections khi không dùng
      connectionTimeoutMillis: 10000, // 10 giây timeout
      idleTimeoutMillis: 20000, // 20 giây idle timeout
      // Neon connection string đã có sslmode=require trong URL
    });

    // Lưu pool vào global để tái sử dụng
    globalForPrisma.pool = pool;

    // Xử lý lỗi connection pool
    pool.on("error", (err) => {
      console.error("Unexpected error on idle client", err);
      // Reset pool nếu có lỗi
      globalForPrisma.pool = undefined;
    });
  }

  // Tạo adapter từ connection pool
  const adapter = new PrismaPg(pool);

  // Tạo Prisma Client instance với adapter
  const prisma = new PrismaClient({
    adapter,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });

  // Lưu instance vào global để tái sử dụng
  globalForPrisma.prisma = prisma;

  return prisma;
}

// Export Prisma Client với lazy initialization và error handling
let _prisma: PrismaClient | undefined;

export const prisma = (() => {
  try {
    if (!_prisma) {
      _prisma = getPrismaClient();
    }
    return _prisma;
  } catch (error) {
    console.error("Failed to initialize Prisma Client:", error);
    // Reset để thử lại lần sau
    _prisma = undefined;
    globalForPrisma.prisma = undefined;
    throw error;
  }
})();
