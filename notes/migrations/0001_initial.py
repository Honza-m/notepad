# Generated by Django 3.2.5 on 2021-07-15 21:38

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Note',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('headline', models.CharField(blank=True, max_length=100, null=True)),
                ('text', models.TextField(blank=True, null=True)),
            ],
        ),
    ]
