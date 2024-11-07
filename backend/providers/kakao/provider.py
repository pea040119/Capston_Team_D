from allauth.socialaccount.providers.base import ProviderAccount
from allauth.socialaccount.providers.oauth2.provider import OAuth2Provider

class KakaoAccount(ProviderAccount):
    def get_profile_url(self):
        return self.account.extra_data.get('properties', {}).get('profile_image')

    def get_avatar_url(self):
        return self.account.extra_data.get('properties', {}).get('thumbnail_image')

    def to_str(self):
        dflt = super(KakaoAccount, self).to_str()
        return self.account.extra_data.get('properties', {}).get('nickname', dflt)

class KakaoProvider(OAuth2Provider):
    id = 'kakao'
    name = 'Kakao'
    account_class = KakaoAccount

    def extract_uid(self, data):
        return str(data['id'])

    def extract_common_fields(self, data):
        return dict(email=data.get('kakao_account', {}).get('email'),
                    username=data.get('properties', {}).get('nickname'))

provider_classes = [KakaoProvider]