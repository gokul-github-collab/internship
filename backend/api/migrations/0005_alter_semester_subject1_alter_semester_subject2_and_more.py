# Generated by Django 5.0.4 on 2024-05-04 07:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0004_remove_course_college'),
    ]

    operations = [
        migrations.AlterField(
            model_name='semester',
            name='subject1',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject2',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject3',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject4',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject5',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject6',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='semester',
            name='subject7',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]