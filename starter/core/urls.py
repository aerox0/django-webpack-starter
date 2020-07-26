from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static

admin.site.site_header = 'Man\'s Pub Admin'
admin.site.site_title = 'Man\'s Pub'

urlpatterns = [
	path('', include('main.urls', namespace = 'main')),
	path('admin/', admin.site.urls),
]

if settings.DEBUG:
	urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
	urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)