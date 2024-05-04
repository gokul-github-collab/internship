from django.urls import path
from . import views


urlpatterns = [
path("notes/", views.NoteListCreate.as_view(), name="note-list"),
path("notes/delete/<int:pk>/",  views.NoteDelete.as_view(), name="delete-note"),
path("courses/", views.CourseListView.as_view(), name="courses"),
path("courses/<slug:pk>/", views.CourseDetailView.as_view(), name="course"),
path("courses/delete/<int:pk>/",  views.CourseDelete.as_view(), name="course-note"),
path('check_superuser/', views.CheckSuperuser.as_view(), name='check_superuser'),
]