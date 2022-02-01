from django.urls import path, include
from .views import DrugsViewSet, DrugReviewViewSet, UserViewSet, ShopViewSet, \
    StoredDrugViewSet, ShopOfferViewSet, CartViewSet, ContactUsViewSet, \
    CustomAuthToken, ShopReviewViewSet

from rest_framework.routers import DefaultRouter
from django.conf.urls.static import static
from django.conf import settings

router = DefaultRouter()
router.register('drugs', DrugsViewSet, basename='drugs')
router.register('dr', DrugReviewViewSet, basename='drug-review')

router.register('shops', ShopViewSet, basename='shops')

router.register('sd', StoredDrugViewSet, basename='store-drugs')
router.register('sd/<str:shopId>', StoredDrugViewSet, basename='store-drugs-shop')
router.register('sd/<str:shopId>/<str:drugId>', StoredDrugViewSet, basename='store-drugs-shop-drug')

router.register('so', ShopOfferViewSet, basename='shop-offer')
router.register('so/<str:shopId>', ShopOfferViewSet, basename='shop-offer-name')
router.register('sr', ShopReviewViewSet, basename='shop-review')

router.register('cart', CartViewSet, basename='cart')

router.register('cu', ContactUsViewSet, basename='contact-us')

router.register('users', UserViewSet)

urlpatterns = [
    path('pp/', include(router.urls)),

]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

urlpatterns += [
    path('api/token/auth/', CustomAuthToken.as_view())
]
