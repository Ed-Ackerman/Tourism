from django.urls import path
from . import views

app_name = 'client'

urlpatterns = [
    
    # client folder urls
    path('', views.index, name='index'),
    
    # form folder urls
    path('progess_form/', views.progess_form, name='progess_form'),
    
    # destination folder urls
    path('main_destination_page/', views.main_destination_page, name='main_destination_page'),
    path('particular_destination_page/', views.particular_destination_page, name='particular_destination_page'),
    
    # experiences folder urls
    path('main_experience_page/', views.main_experience_page, name='main_experience_page'),
    path('particular_experience_page/', views.particular_experience_page, name='particular_experience_page'),
    path('intinerary/', views.intinerary, name='intinerary'),
        
    # blog folder urls
    path('main_blog_page/', views.main_blog_page, name='main_blog_page'),
    path('read_blog_page/', views.read_blog_page, name='read_blog_page'),
    
    # about folder urls
    path('main_about_page/', views.main_about_page, name='main_about_page'),
    path('our_team_page/', views.our_team_page, name='our_team_page'),
    path('read_about/', views.read_about, name='read_about'),
    path('our_impact/', views.our_impact, name='our_impact'),
    
    # read more folder urls
    path('read_more/', views.read_more, name='read_more'), 
    
    # Shop folder urls
    path('shop/', views.shop, name='shop'),
    
    # Admin Dashboard URL
    path('dashboard/', views.dashboard, name='dashboard'),
]