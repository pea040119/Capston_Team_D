# Generated by Django 5.1.2 on 2024-12-03 11:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_d_day_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='score',
            old_name='student_id',
            new_name='tutor_id',
        ),
        migrations.RemoveField(
            model_name='score',
            name='class_id',
        ),
    ]
