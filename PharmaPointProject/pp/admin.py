from django.contrib import admin
from .models import Drugs, DrugReview, Shop, StoredDrug, ShopOffer, ShopReview, Cart, ContactUs


@admin.register(Drugs)
class DragsModel(admin.ModelAdmin):
    list_filter = ('name', 'unitPrice')
    list_display = ('id', 'name', 'category', 'manufacturer', 'unitPrice', 'storageTemperature',
                    'ageLevel', 'drugImg', 'timeStampUpdated', 'timeStampCreated')


@admin.register(DrugReview)
class DrugReviewModel(admin.ModelAdmin):
    list_filter = ('id', 'drugId', 'userId', 'comment', 'commentUpdated')
    list_display = ('id', 'drugId', 'userId', 'comment', 'commentUpdated')


@admin.register(Shop)
class ShopModel(admin.ModelAdmin):
    list_filter = ('id', 'shopName', 'mobilePhone', 'email', 'address', 'city', 'ratings',
                   'shopImg', 'timeStampUpdated', 'timeStampCreated')
    list_display = ('id', 'shopName', 'mobilePhone', 'email', 'address', 'city', 'ratings',
                    'shopImg', 'timeStampUpdated', 'timeStampCreated')


@admin.register(StoredDrug)
class StoredDrugModel(admin.ModelAdmin):
    list_filter = ('id', 'drugId', 'shopId',  'batchNo', 'manufacturingDate', 'expireDate', 'quantity')
    list_display = ('id', 'drugId', 'shopId',  'batchNo', 'manufacturingDate', 'expireDate', 'quantity')


@admin.register(ShopOffer)
class ShopOfferModel(admin.ModelAdmin):
    list_filter = ('shopId', 'offerInPercentage', 'offerInTaka', 'offerTill')
    list_display = ('shopId', 'offerInPercentage', 'offerInTaka', 'offerTill')


@admin.register(ShopReview)
class ShopReviewModel(admin.ModelAdmin):
    list_filter = ('id', 'shopId', 'userId', 'comment', 'commentUpdated')
    list_display = ('id', 'shopId', 'userId', 'comment', 'commentUpdated')


@admin.register(Cart)
class CartModel(admin.ModelAdmin):
    list_filter = ('id', 'sdId', 'userId')
    list_display = ('id', 'sdId', 'userId')


@admin.register(ContactUs)
class ShopOfferModel(admin.ModelAdmin):
    list_filter = ('subject', 'desc', 'userName')
    list_display = ('userName', 'subject', 'desc', )

