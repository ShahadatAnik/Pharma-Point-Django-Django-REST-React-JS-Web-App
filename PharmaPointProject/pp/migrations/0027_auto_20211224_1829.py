# Generated by Django 3.2.9 on 2021-12-24 12:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pp', '0026_auto_20211223_2018'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='drugs',
            options={'ordering': ['name']},
        ),
        migrations.AlterField(
            model_name='shop',
            name='address',
            field=models.CharField(default='No Address', max_length=500),
        ),
        migrations.AlterField(
            model_name='shop',
            name='city',
            field=models.CharField(default='No City', max_length=500),
        ),
        migrations.AlterField(
            model_name='shop',
            name='email',
            field=models.EmailField(blank=True, default='example@mail.com', max_length=254),
        ),
        migrations.AlterField(
            model_name='shop',
            name='mobilePhone',
            field=models.CharField(max_length=20),
        ),
        migrations.AlterField(
            model_name='shop',
            name='ratings',
            field=models.IntegerField(blank=True, default=0),
        ),
        migrations.AlterField(
            model_name='shop',
            name='shopName',
            field=models.CharField(default='No Shop Name', max_length=100),
        ),
    ]