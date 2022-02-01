from django.db import models


# Create your models here.
def shop_img_upload_path(instance, fileName):
    return '/'.join(['shops', str(instance.shopName), fileName])


def drug_img_upload_path(instance, fileName):
    return '/'.join(['drugs', str(instance.name), fileName])


class Drugs(models.Model):
    name = models.CharField(max_length=100, default="No name", null=False)
    category = models.CharField(max_length=100, default="", null=False)
    manufacturer = models.CharField(max_length=100, default="", null=False)
    unitPrice = models.FloatField(max_length=10, default=0, null=False)
    storageTemperature = models.FloatField(max_length=6, default=0, null=True)
    ageLevel = models.CharField(max_length=100, default="", null=True)
    drugImg = models.ImageField(blank=True, null=True, upload_to=drug_img_upload_path)

    timeStampUpdated = models.DateTimeField(auto_now=True)
    timeStampCreated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['name']

    def __str__(self):
        return self.name or ''


class DrugReview(models.Model):
    drugId = models.IntegerField(default=-1, blank=False)
    userId = models.IntegerField(default=-1, blank=False)
    comment = models.CharField(max_length=255, default="Default Comment", blank=False)
    commentUpdated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['commentUpdated']

    def __str__(self):
        return ''


class Shop(models.Model):
    shopName = models.CharField(max_length=100, default="No Shop Name", null=False)
    mobilePhone = models.CharField(max_length=20)
    email = models.EmailField(max_length=254, blank=True, default="example@mail.com",)
    address = models.CharField(max_length=500, default="No Address", blank=False)
    city = models.CharField(max_length=500, default="No City", blank=False)
    ratings = models.IntegerField(default=0, blank=True)
    shopImg = models.ImageField(blank=True, null=True, upload_to=shop_img_upload_path)

    timeStampUpdated = models.DateTimeField(auto_now=True)
    timeStampCreated = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['shopName']

    def __str__(self):
        return self.shopName or ''


class StoredDrug(models.Model):
    id = models.BigAutoField(primary_key=True)
    drugId = models.ForeignKey(Drugs, on_delete=models.CASCADE)
    shopId = models.ForeignKey(Shop, on_delete=models.CASCADE)
    batchNo = models.FloatField(max_length=10, default=0, blank=False)
    manufacturingDate = models.DateField()
    expireDate = models.DateField()
    quantity = models.FloatField(max_length=10, default=0, blank=False)

    class Meta:
        ordering = ['drugId']

    def __str__(self):
        return ''


class ShopOffer(models.Model):
    shopId = models.ForeignKey(Shop, on_delete=models.CASCADE, primary_key=True)
    offerInPercentage = models.FloatField(max_length=10, default=0, blank=True)
    offerInTaka = models.FloatField(max_length=10, default=0, blank=True)
    offerTill = models.DateField(null=False)

    class Meta:
        ordering = ['offerTill']

    def __str__(self):
        return ''


class ShopReview(models.Model):
    shopId = models.IntegerField(default=-1, blank=False)
    userId = models.IntegerField(default=-1, blank=False)
    comment = models.CharField(max_length=255, default="Default Comment", blank=False)
    commentUpdated = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['commentUpdated']

    def __str__(self):
        return ''


class Cart(models.Model):
    sdId = models.IntegerField(default=-1, blank=False)
    userId = models.IntegerField(default=-1, blank=False)

    class Meta:
        ordering = ['userId']

    def __str__(self):
        return ''


class ContactUs(models.Model):
    userName = models.CharField(max_length=100, default="No Name", blank=False)
    subject = models.CharField(max_length=100, default="No subject", blank=True)
    desc = models.CharField(max_length=1000, blank=False)
