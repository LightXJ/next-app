import withJoi from "next-joi";

export const validate = withJoi({
  onValidationError: (_, res) => {
    return res.status(400).json({ success: false, error: {message: '参数错误'}});
  },
});
