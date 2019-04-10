from django.contrib import admin
from django.urls import path, re_path
from django.views.generic import TemplateView
from api import views
from rest_framework.urlpatterns import format_suffix_patterns

# The commented out lines below are examples fo writing endpoints

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/notes/', views.notes_list),
    path('api/notes/<note_id>/', views.notes_detail),

    path('events/year/<year>/month/<month>/day/<day>/', views.events_list),
    path('events/<event_id>', views.events_detail),
    re_path('.*', TemplateView.as_view(template_name='index.html')),
]

urlpatterns = format_suffix_patterns(urlpatterns)

