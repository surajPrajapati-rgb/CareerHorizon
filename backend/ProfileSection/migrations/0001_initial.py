# Generated by Django 5.0.6 on 2024-10-24 06:48

import django.db.models.deletion
import django.utils.timezone
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Profile',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('user_type', models.CharField(choices=[('mentor', 'Mentor'), ('mentee', 'Mentee')], max_length=12)),
                ('phone_number', models.CharField(blank=True, max_length=30, null=True)),
                ('date_of_birth', models.DateField(blank=True, null=True)),
                ('gender', models.CharField(blank=True, choices=[('male', 'Male'), ('female', 'Female'), ('non-binary', 'Non-binary'), ('prefer_not_to_say', 'Prefer not to say')], max_length=50, null=True)),
                ('headline', models.CharField(blank=True, max_length=255, null=True)),
                ('bio', models.TextField(blank=True, null=True)),
                ('country', models.CharField(blank=True, max_length=100, null=True)),
                ('profile_photo', models.ImageField(blank=True, null=True, upload_to='ProfileSection/media/profile_photos/')),
                ('background_image', models.ImageField(blank=True, null=True, upload_to='ProfileSection/media/background_images/')),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('last_login', models.DateTimeField(blank=True, null=True)),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Experience',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=255)),
                ('company', models.CharField(max_length=255)),
                ('location', models.CharField(blank=True, max_length=255, null=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='experiences', to='ProfileSection.profile')),
            ],
        ),
        migrations.CreateModel(
            name='Education',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('school', models.CharField(max_length=255)),
                ('degree', models.CharField(blank=True, max_length=255, null=True)),
                ('field_of_study', models.CharField(blank=True, max_length=255, null=True)),
                ('start_date', models.DateField()),
                ('end_date', models.DateField(blank=True, null=True)),
                ('description', models.TextField(blank=True, null=True)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='education', to='ProfileSection.profile')),
            ],
        ),
        migrations.CreateModel(
            name='SocialLink',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('platform', models.CharField(choices=[('linkedin', 'LinkedIn'), ('github', 'GitHub'), ('twitter', 'Twitter'), ('facebook', 'Facebook'), ('instagram', 'Instagram'), ('website', 'Personal Website')], max_length=50)),
                ('url', models.URLField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='social_links', to='ProfileSection.profile')),
            ],
        ),
    ]
