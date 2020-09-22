from django.shortcuts import render
import requests
# Create your views here.

def home(request):
	return render(request,'home.html')
def about(request):
	return render(request,'about.html')
def contact(request):
	return render(request,'contact.html')
def dashboard(request):
	return render(request,'dashboard.html')
def login(request):
	return render(request,'login.html')
