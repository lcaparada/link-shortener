import { apiRequest } from "@/services/api";

async function getUrlsFromIp() {
  try {
    const result = await apiRequest({
      method: "get",
      url: "/url",
    });
    console.log(result);
    return result;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    throw error?.response?.data?.message;
  }
}

export const urlService = {
  getUrlsFromIp,
};
