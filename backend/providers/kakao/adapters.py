from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter
import requests

class KakaoOAuth2Adapter(OAuth2Adapter):
    provider_id = 'kakao'
    access_token_url = 'https://kauth.kakao.com/oauth/token'
    authorize_url = 'https://kauth.kakao.com/oauth/authorize'
    profile_url = 'https://kapi.kakao.com/v2/user/me'

    def complete_login(self, request, app, token, **kwargs):
        headers = {'Authorization': 'Bearer ' + token.token}
        extra_data = requests.get(self.profile_url, headers=headers).json()
        return self.get_provider().sociallogin_from_response(request, extra_data)