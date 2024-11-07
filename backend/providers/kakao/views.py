from allauth.socialaccount.providers.oauth2.views import OAuth2LoginView, OAuth2CallbackView
from .adapters import KakaoOAuth2Adapter

oauth2_login = OAuth2LoginView.adapter_view(KakaoOAuth2Adapter)
oauth2_callback = OAuth2CallbackView.adapter_view(KakaoOAuth2Adapter)