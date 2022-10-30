import type { NextApiResponse } from "next";
export const errorHandler = (error: any, res: NextApiResponse) => {
  // Custom error - Bad Request(try句でthrowしたエラー)
  if (error instanceof Error) {
    return res.status(400).json({ message: error.message });
  }

  // Custom error - 短時間で頻繁にアクセスしたとき
  if (error.code === 429 || error.status === 429) {
    return error.status(404).json({ message: error.message });
  }

  // 404
  if (error.code === 404 || error.status === 404) {
    return res.status(404).json({ message: error.message });
  }

  // 500
  return res.status(500).json({ message: error.message });
};
