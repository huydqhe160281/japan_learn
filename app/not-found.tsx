import Link from "next/link";
import {
  AppCard,
  AppTitle,
  AppText,
  AppButton,
} from "./components/shared/common";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-8">
      <div className="mx-auto max-w-4xl">
        <AppCard variant="shadow">
          <div className="py-12 text-center">
            <AppTitle level={1} className="mb-4">
              404 - Trang không tồn tại
            </AppTitle>
            <AppText variant="secondary" size="lg" className="mb-6">
              Trang bạn đang tìm kiếm không tồn tại hoặc đã bị xóa.
            </AppText>
            <Link href="/multiple">
              <AppButton colorType="primary" size="large">
                Về trang chủ
              </AppButton>
            </Link>
          </div>
        </AppCard>
      </div>
    </div>
  );
}
