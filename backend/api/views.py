from django.contrib.auth.models import User
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note
from .serializers import UserSerializer,NoteSerializer
from rest_framework import generics
from .models import Course
from .serializers import CourseSerializer,SemesterSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.generics import RetrieveUpdateDestroyAPIView
class CheckSuperuser(APIView):
    def get(self, request, *args, **kwargs):
        if request.user.is_superuser:
            return Response({'is_superuser': True}, status=status.HTTP_200_OK)
        else:
            return Response({'is_superuser': False}, status=status.HTTP_200_OK)



class CourseCreateView(generics.CreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

    # Override the create method to customize the response
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
class CourseListView(generics.ListCreateAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

class CourseDetailView(RetrieveUpdateDestroyAPIView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    permission_classes = [AllowAny]

    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        serializer = self.get_serializer(instance)

        # Fetch related college details

        # Fetch related semesters details
        semester_serializer = SemesterSerializer(instance.semesters, many=True)
        semester_data = semester_serializer.data

        data = {
            'course': serializer.data,
            'semesters': semester_data
        }
        return Response(data)

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]


class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)


class NoteDelete(generics.DestroyAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Note.objects.filter(author=user)


class CourseDelete(generics.DestroyAPIView):
    serializer_class = CourseSerializer
    permission_classes = [IsAuthenticated]

