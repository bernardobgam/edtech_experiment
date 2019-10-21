"""experiment URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.contrib.auth import views as auth_views
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from django.shortcuts import render
from .views import *
from lab.views import *
from data.views import *
from forms.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('django.contrib.auth.urls')),
    path('accounts/login/', auth_views.LoginView.as_view(template_name='accounts/login.html')),
    # path('panel', control_panel_view, name='control-panel'),
    path('receipt/', cash_receipt_view, name='cash-receipt'),

    # Researcher
    path('lab/<code_id>/', control_panel_view, name='control-panel'),
    path('experiments/', experiments_view, name='experiments'),
    path('econometrics/', econometrics_view, name='econometrics'),

    path('', home_view, name='home'),
    path('wait/', waiting_screen_view, name='waiting-screen'),

    path('consent/', consent_view, name='consent'),
    path('instructions/', instructions_view, name='instructions'),
    path('content/', content_view, name='content'),
    path('quiz/', quiz_view, name='quiz'),
    path('survey/', survey_view, name='survey'),
    # Robots txt
    path('robots.txt', lambda x: HttpResponse("User-Agent: *\nDisallow: /", content_type="text/plain"), name="robots_file"),
    # Clear Session
    path('reset/', clean_session_view, name='reset'),


    #REST API
    #Views
    path('get/', GetLabCode.as_view(), name="get_code"),
    path('update/', UpdateLabProgress.as_view(), name="update_progress"),
    path('get/consented/', ConsentFormRetrieve.as_view(), name="lab_consented"),
    path('get/group/', GroupRetrieve.as_view(), name="lab_get_group"),
    path('get/access/', RetrieveAccess.as_view(), name="lab_get_access"),
    path('submit/quiz/', CreateQuizSubmission.as_view(), name="url_submit_quiz"),
    path('submit/survey/', CreateSurveySubmission.as_view(), name="url_submit_survey"),


    # Admin Views

    path('experiments/receipts/', CashReceiptPdf, name="download-cash_receipt"),
    path('experiments/consents/', ConsentsPdf, name="download-consent_forms"),
    path('lab/<int:code_id>/randomise/', LabProgressGroups.as_view(), name="lab-randomise"),
    path('participants/<int:code_id>/', GetLabProgress.as_view(), name="get_participants"),
    path('set/access/', UpdateAccess.as_view(), name="lab_set_access"),
    path('retrieve/all/', RetrieveAllData.as_view(), name="retrieve_all_data"),





    # path('api/lab/', include('lab.urls')),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
