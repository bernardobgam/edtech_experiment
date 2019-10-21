from django.urls import path

from . import views

urlpatterns = [
    path('get/', views.GetLabCode.as_view(), name="get_code"),
    path('participants/', views.GetLabProgress.as_view(), name="get_participants"),
    

]
