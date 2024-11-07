from allauth.socialaccount.providers.oauth2.views import OAuth2Adapter
from .provider import KakaoProvider
from django.urls import reverse
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from allauth.socialaccount.providers.oauth2.views import OAuth2LoginView, OAuth2CallbackView
import requests

class KakaoOAuth2Adapter(OAuth2Adapter):
    provider_id = KakaoProvider.id
    access_token_url = 'https://kauth.kakao.com/oauth/token'
    authorize_url = 'https://kauth.kakao.com/oauth/authorize'
    profile_url = 'https://kapi.kakao.com/v2/user/me'

    def complete_login(self, request, app, token, **kwargs):
        headers = {'Authorization': 'Bearer ' + token.token}
        extra_data = requests.get(self.profile_url, headers=headers).json()
        return self.get_provider().sociallogin_from_response(request, extra_data)

oauth2_login = OAuth2LoginView.adapter_view(KakaoOAuth2Adapter)
oauth2_callback = OAuth2CallbackView.adapter_view(KakaoOAuth2Adapter)