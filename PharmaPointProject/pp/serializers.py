from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.authtoken.views import Token

from .models import Drugs, DrugReview, Shop, StoredDrug, ShopOffer, ShopReview, Cart, ContactUs


class DrugsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Drugs
        fields = '__all__'


class DrugReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = DrugReview
        fields = '__all__'


class ShopSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shop
        fields = '__all__'


class StoredDrugSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoredDrug
        fields = '__all__'
    drugId = DrugsSerializer(many=False)
    shopId = ShopSerializer(many=False)


class ShopOfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopOffer
        fields = '__all__'
    shopId = ShopSerializer(many=False)


class ShopReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopReview
        fields = '__all__'


class CartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = '__all__'


class ContactUsSerializer(serializers.ModelSerializer):
    class Meta:
        model = ContactUs
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = '__all__'

    extra_kwargs = {'password': {
        'write_only': True,
        'required': True
    }}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.get_or_create(user=user)
        return user







'''
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email
        })



class DrugsSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, default="No name", allow_blank=False)
    scientificName = serializers.CharField(max_length=100, default="", allow_blank=True)
    category = serializers.CharField(max_length=100, default="", allow_blank=False)
    manufacturer = serializers.CharField(max_length=100, default="", allow_blank=False)
    unitPrice = serializers.FloatField(max_value=None, min_value=0)
    storageTemperature = serializers.FloatField(max_value=None, min_value=0)
    dangerousLevel = serializers.CharField(max_length=100, default="")
    storageLocation = serializers.CharField(max_length=100, default="")

    timeStampUpdated = serializers.DateTimeField(read_only=False)
    timeStampCreated = serializers.DateTimeField()

    # Create and return a new `Article` instance,
    # given the validated data.
    def create(self, validated_data):
        return Drugs.objects.create(validated_data)

    #Update and return an existing `Article` instance,
    # given the validated data.

    def update(self, instance, validated_data):

        instance.name = validated_data.get('name', instance.name)
        instance.scientificName = validated_data.get('scientificName', instance.scientificName)
        instance.category = validated_data.get('category', instance.category)
        instance.manufacturer = validated_data.get('manufacturer', instance.manufacturer)
        instance.unitPrice = validated_data.get('unitPrice', instance.unitPrice)
        instance.storageTemperature = validated_data.get('storageTemperature', instance.storageTemperature)
        instance.dangerousLevel = validated_data.get('dangerousLevel', instance.dangerousLevel)
        instance.storageLocation = validated_data.get('storageLocation', instance.storageLocation)
        instance.timeStampUpdated = validated_data.get('timeStampUpdated', instance.timeStampUpdated)
        instance.timeStampCreated = validated_data.get('timeStampCreated', instance.timeStampCreated)
'''
