"""dashboardAPI URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
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
#from django.contrib import admin
from django.urls import path
from dashboardAPI import views
from rest_framework.authtoken.views import obtain_auth_token

from rest_framework.routers import DefaultRouter

from dashboardAPI.views import CamposLogViewSet
from dashboardAPI.views import TipoEquiposViewSet
from dashboardAPI.views import EquiposViewSet
from dashboardAPI.views import LogEquipoRegViewSet

urlpatterns = [
    path('hello/', views.HelloView.as_view(), name='hello'),
    path('api-token-auth/', obtain_auth_token, name='api_token_auth'),
]

app_name = 'api'
 
router = DefaultRouter(trailing_slash=False)

router.register(r'campos_log', CamposLogViewSet)
router.register(r'tipo_equipo', TipoEquiposViewSet)
router.register(r'equipo', EquiposViewSet)
router.register(r'log_equipo', LogEquipoRegViewSet)

urlpatterns = urlpatterns + router.urls