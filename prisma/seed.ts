// Phải import dotenv/config trước khi import PrismaClient
// để đảm bảo DATABASE_URL được load từ .env file
import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { hiragana, katakana } from "../app/data/japaneseAlphabet";

// Kiểm tra DATABASE_URL trước khi khởi tạo PrismaClient
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL không được tìm thấy trong environment variables. " +
      "Vui lòng kiểm tra file .env và đảm bảo DATABASE_URL đã được cấu hình.",
  );
}

// Tạo PostgreSQL connection pool với timeout settings
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 1, // Chỉ cần 1 connection cho seed script
  connectionTimeoutMillis: 10000, // 10 giây timeout
  idleTimeoutMillis: 30000,
});

// Tạo adapter từ connection pool
const adapter = new PrismaPg(pool);

// Khởi tạo PrismaClient với adapter
const prisma = new PrismaClient({ adapter });

/**
 * Script seed để import dữ liệu ký tự tiếng Nhật vào database
 * Chạy lệnh: npx tsx prisma/seed.ts
 */
async function main() {
  console.log("🌱 Bắt đầu seed dữ liệu...");

  // Xóa tất cả dữ liệu cũ (nếu có)
  // Bỏ qua nếu có lỗi (có thể table chưa tồn tại hoặc đã trống)
  console.log("🗑️  Xóa dữ liệu cũ...");
  try {
    await prisma.japaneseCharacter.deleteMany({});
    console.log("✅ Đã xóa dữ liệu cũ");
  } catch (error) {
    console.log(
      "⚠️  Không thể xóa dữ liệu cũ (có thể table đã trống hoặc chưa tồn tại), tiếp tục...",
    );
  }

  // Import Hiragana
  console.log("📝 Đang import Hiragana...");
  await prisma.japaneseCharacter.createMany({
    data: hiragana.map((char) => ({
      character: char.character,
      romaji: char.romaji,
      type: char.type,
    })),
  });
  console.log(`✅ Đã import ${hiragana.length} ký tự Hiragana`);

  // Import Katakana
  console.log("📝 Đang import Katakana...");
  await prisma.japaneseCharacter.createMany({
    data: katakana.map((char) => ({
      character: char.character,
      romaji: char.romaji,
      type: char.type,
    })),
  });
  console.log(`✅ Đã import ${katakana.length} ký tự Katakana`);

  // Tổng kết
  const totalCount = await prisma.japaneseCharacter.count();
  console.log(
    `\n🎉 Hoàn thành! Tổng cộng ${totalCount} ký tự đã được import vào database.`,
  );
}

main()
  .catch((e) => {
    console.error("❌ Lỗi khi seed dữ liệu:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
