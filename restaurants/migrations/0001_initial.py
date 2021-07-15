# Generated by Django 3.2.5 on 2021-07-13 05:32

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Restaurants',
            fields=[
                ('place_id', models.CharField(max_length=200, primary_key=True, serialize=False)),
                ('lat', models.DecimalField(decimal_places=7, max_digits=20)),
                ('lng', models.DecimalField(decimal_places=7, max_digits=20)),
                ('name', models.CharField(max_length=200)),
                ('vicitiny', models.CharField(max_length=200)),
                ('favorite', models.BooleanField(default=False)),
                ('visits', models.IntegerField(default=0)),
                ('user', models.ManyToManyField(default=None, related_name='user_name', to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]