from django.contrib import admin
from .models import Note, Course, College, Semester

# Register your models here.

admin.site.register(Note)
admin.site.register(Course)
admin.site.register(College)
admin.site.register(Semester)