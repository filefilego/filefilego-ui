import axios from "axios";
const uploadData = async (
  endpoint,
  authtoken,
  frmData,
  cancelToken,
  progresscb
) => {
  try {
    const result = await axios.post(endpoint, frmData, {
      cancelToken: cancelToken.token,
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `${authtoken}`,
      },
      onUploadProgress: progresscb,
    });
    return { success: true, data: result.data };
  } catch (e) {
    console.log(e);
    return { success: false, error: e };
  }
};

export default {
  uploadData,
};
