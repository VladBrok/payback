import dynamic from "next/dynamic";

const Page = dynamic(() => import("components/ChatsPage"), { ssr: false });
Page.auth = true;
export default Page;
