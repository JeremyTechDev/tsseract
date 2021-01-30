/**
 * Refreshes the Google User Token
 * @param res {GoogleResponse}
 */
export const refreshToken = (res: any) => {
  let refreshingTimeout = (res.tokenObj.expires_in || 3600 - 5 * 60) * 1000;

  const refresh = async () => {
    const newAuthRes = await res.reloadAuthResponse();
    refreshingTimeout = (newAuthRes.expires_in || 3600 - 5 * 60) * 1000;
    setTimeout(refresh, refreshingTimeout);
  };

  setTimeout(refresh, refreshingTimeout);
};
