# Generated by Django 3.2.9 on 2021-12-11 09:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('pp', '0018_contactus_name'),
    ]

    operations = [
        migrations.RenameField(
            model_name='contactus',
            old_name='name',
            new_name='userName',
        ),
    ]
