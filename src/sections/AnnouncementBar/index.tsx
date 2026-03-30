import { DesktopAnnouncementBar } from "@/sections/AnnouncementBar/components/DesktopAnnouncementBar";
import { MobileAnnouncementBar } from "@/sections/AnnouncementBar/components/MobileAnnouncementBar";

export const AnnouncementBar = () => {
  return (
    <div className="relative box-border caret-transparent min-h-[52px]">
      <div className="bg-black box-border caret-transparent">
        <DesktopAnnouncementBar />
        <MobileAnnouncementBar />
      </div>
    </div>
  );
};
