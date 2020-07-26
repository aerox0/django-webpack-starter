from django.shortcuts import render
from django.http.request import HttpRequest

def index(req: HttpRequest):
	return render(req, 'main/pages/home.html', {})
