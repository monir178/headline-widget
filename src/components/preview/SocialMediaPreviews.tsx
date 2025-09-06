import { Twitter, Linkedin, Instagram } from "lucide-react";
import { PreviewText } from "./PreviewText";

interface SocialMediaPreviewProps {
  className?: string;
}

export const TwitterPreview = ({ className = "" }: SocialMediaPreviewProps) => (
  <div
    className={`w-full h-full bg-white overflow-y-auto scrollbar-hide ${className}`}>
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
      <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg sm:rounded-xl md:rounded-2xl shadow-lg border border-gray-200 p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <Twitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
              Your Brand
            </div>
            <div className="text-xs sm:text-sm text-gray-500">@yourbrand</div>
          </div>
        </div>
        <div className="text-gray-900">
          <PreviewText />
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 text-xs sm:text-sm text-gray-500">
          2h
        </div>
      </div>
    </div>
  </div>
);

export const LinkedInPreview = ({
  className = "",
}: SocialMediaPreviewProps) => (
  <div
    className={`w-full h-full bg-gray-50 overflow-y-auto scrollbar-hide ${className}`}>
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
      <div className="w-full max-w-[260px] sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-white rounded-lg shadow-sm border border-gray-200 p-2 sm:p-3 md:p-4 lg:p-6">
        <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3 md:mb-4">
          <div className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Linkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-white" />
          </div>
          <div>
            <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
              Your Name
            </div>
            <div className="text-xs sm:text-sm text-gray-500">
              Professional Title
            </div>
          </div>
        </div>
        <div className="text-gray-900">
          <PreviewText />
        </div>
        <div className="mt-2 sm:mt-3 md:mt-4 flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-500">
          <span>👍 12</span>
          <span>💬 3</span>
          <span>🔄 1</span>
        </div>
      </div>
    </div>
  </div>
);

export const InstagramPreview = ({
  className = "",
}: SocialMediaPreviewProps) => (
  <div
    className={`w-full h-full bg-gradient-to-br from-purple-500 to-pink-500 overflow-y-auto scrollbar-hide ${className}`}>
    <div className="p-2 sm:p-3 md:p-4 lg:p-6 min-h-full flex items-center justify-center">
      <div className="w-full max-w-[240px] sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-lg bg-white rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden">
        <div className="p-2 sm:p-3 md:p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <Instagram className="w-2.5 h-2.5 sm:w-3 sm:h-3 md:w-4 md:h-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 text-xs sm:text-sm md:text-base">
                yourbrand
              </div>
            </div>
          </div>
        </div>
        <div className="p-3 sm:p-4 md:p-6 bg-white">
          <PreviewText />
        </div>
        <div className="p-2 sm:p-3 md:p-4 border-t border-gray-200">
          <div className="flex items-center gap-1 sm:gap-2 md:gap-4 text-xs sm:text-sm text-gray-500">
            <span>❤️ 24</span>
            <span>💬 5</span>
            <span>📤</span>
          </div>
        </div>
      </div>
    </div>
  </div>
);
