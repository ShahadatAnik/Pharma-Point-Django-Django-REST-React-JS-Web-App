# Generated by Django 3.2.9 on 2021-12-04 17:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('pp', '0014_auto_20211204_2315'),
    ]

    operations = [
        migrations.AlterField(
            model_name='shop',
            name='email',
            field=models.EmailField(default='None@mail.com', max_length=254, null=True),
        ),
    ]