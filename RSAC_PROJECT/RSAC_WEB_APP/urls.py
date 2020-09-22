from django.urls import path
from . import views 

urlpatterns = [
	path('',views.home, name='home'),
	path('about.html/',views.about, name='about'),
	path('contact.html/',views.contact, name='contact'),
	path('dashboard.html/',views.dashboard, name='dashboard'),
	path('login.html/',views.login, name='login'),
]