import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import type { AlphabetType } from "@/app/data/japaneseAlphabet";

// GET endpoint để lấy danh sách ký tự tiếng Nhật
// Có thể filter theo type (hiragana hoặc katakana)
export async function GET(request: Request) {
  try {
    // Lấy query parameters từ URL
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type") as AlphabetType | null;

    // Validate type nếu có
    if (type && type !== "hiragana" && type !== "katakana") {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid type parameter. Must be 'hiragana' or 'katakana'",
        },
        { status: 400 },
      );
    }

    // Xây dựng query với filter nếu có
    const where = type ? { type } : {};

    // Lấy dữ liệu từ database với retry logic
    let characters;
    let retries = 3;

    while (retries > 0) {
      try {
        characters = await prisma.japaneseCharacter.findMany({
          where,
          orderBy: [{ type: "asc" }, { character: "asc" }],
        });
        break; // Thành công, thoát khỏi loop
      } catch (dbError) {
        retries--;
        if (retries === 0) {
          throw dbError; // Hết retry, throw error
        }
        // Đợi một chút trước khi retry
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Retrying database query... (${3 - retries}/3)`);
      }
    }

    return NextResponse.json({
      success: true,
      data: characters,
    });
  } catch (error) {
    console.error("Error fetching Japanese characters:", error);

    // Log chi tiết lỗi để debug
    if (error instanceof Error) {
      console.error("Error message:", error.message);
      console.error("Error stack:", error.stack);

      // Kiểm tra các loại lỗi phổ biến
      if (
        error.message.includes("ETIMEDOUT") ||
        error.message.includes("timeout")
      ) {
        console.error(
          "Connection timeout - có thể do network hoặc database overload",
        );
      }
      if (error.message.includes("ECONNREFUSED")) {
        console.error(
          "Connection refused - kiểm tra DATABASE_URL và database availability",
        );
      }
    }

    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch Japanese characters",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
