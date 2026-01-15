import type {
  AlphabetType,
  JapaneseCharacter,
} from "@/app/data/japaneseAlphabet";

/**
 * Utility functions để fetch dữ liệu từ API
 */

// Interface cho response từ API
interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Lấy danh sách ký tự tiếng Nhật từ database
 * @param type - Loại bảng chữ cái (hiragana hoặc katakana), nếu không có thì lấy tất cả
 * @returns Promise với danh sách ký tự
 */
export async function getJapaneseCharacters(
  type?: AlphabetType,
): Promise<JapaneseCharacter[]> {
  try {
    // Xây dựng URL với query parameter nếu có
    const url = type
      ? `/api/japanese-characters?type=${type}`
      : "/api/japanese-characters";

    // Fetch dữ liệu từ API
    const response = await fetch(url, {
      cache: "no-store", // Đảm bảo luôn lấy dữ liệu mới nhất
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result: ApiResponse<JapaneseCharacter[]> = await response.json();

    if (!result.success || !result.data) {
      throw new Error(result.error || "Failed to fetch characters");
    }

    return result.data;
  } catch (error) {
    console.error("Error fetching Japanese characters:", error);
    throw error;
  }
}

/**
 * Lấy tất cả ký tự Hiragana
 */
export async function getHiragana(): Promise<JapaneseCharacter[]> {
  return getJapaneseCharacters("hiragana");
}

/**
 * Lấy tất cả ký tự Katakana
 */
export async function getKatakana(): Promise<JapaneseCharacter[]> {
  return getJapaneseCharacters("katakana");
}
