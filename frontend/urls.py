from django.contrib.auth.views import LoginView, LogoutView
from django.urls import path, re_path

from frontend import views

urlpatterns = [
    path("", LoginView.as_view(template_name="login.html"), name="login"),
    path("logout/", LogoutView.as_view(), name="logout"),
    re_path(r"^app/", views.index, name="index"),
]
