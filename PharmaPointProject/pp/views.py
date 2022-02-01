from django.contrib.auth.models import User
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from rest_framework.response import Response
from rest_framework import viewsets

from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token

from .models import Drugs, DrugReview, Shop, StoredDrug, ShopOffer, ShopReview, Cart, ContactUs
from .serializers import DrugsSerializer, DrugReviewSerializer, UserSerializer, ShopSerializer, \
    StoredDrugSerializer, ShopOfferSerializer, ShopReviewSerializer, CartSerializer, ContactUsSerializer


class DrugsViewSet(viewsets.ModelViewSet):
    queryset = Drugs.objects.all()
    serializer_class = DrugsSerializer
    lookup_field = 'name'
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class DrugReviewViewSet(viewsets.ModelViewSet):
    queryset = DrugReview.objects.all()
    serializer_class = DrugReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
    lookup_field = 'shopName'
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class StoredDrugViewSet(viewsets.ModelViewSet):
    queryset = StoredDrug.objects.all()
    serializer_class = StoredDrugSerializer
    lookup_field = 'id'
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class ShopOfferViewSet(viewsets.ModelViewSet):
    queryset = ShopOffer.objects.all()
    serializer_class = ShopOfferSerializer
    lookup_field = 'shopId'
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class ShopReviewViewSet(viewsets.ModelViewSet):
    queryset = ShopReview.objects.all()
    serializer_class = ShopReviewSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class CartViewSet(viewsets.ModelViewSet):
    queryset = Cart.objects.all()
    serializer_class = CartSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class ContactUsViewSet(viewsets.ModelViewSet):
    queryset = ContactUs.objects.all()
    serializer_class = ContactUsSerializer
    permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CustomAuthToken(ObtainAuthToken):

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.id,
        })


'''
class ListUsers(APIView):

    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, format=None):
        id = [user.id for user in User.objects.all()]
        return Response(id)
        
        
        
        
    def get_queryset(self):
        return Response({
            "user": User.objects.all()
            "token": Token.objects.create(user=user)
        })

@api_view(['GET', 'POST'])
def drug_list(request):
    # get all articles
    if request.method == 'GET':
        drugs = Drugs.objects.all()
        serializer = DrugsSerializer(drugs, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = DrugsSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def drugs_details(request, name):
    try:
        drug = Drugs.objects.get(name=name)
    except Drugs.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = DrugsSerializer(drug)
        return Response(serializer.data)

    elif request.method == 'PUT':

        serializer = DrugsSerializer(drug, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        drug.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
'''
