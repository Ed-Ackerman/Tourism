from django.shortcuts import render
from django.contrib.auth.models import User
from django.contrib.auth.decorators import login_required
# Create your views here.

# client folder views
def index(request):
    usernames = User.objects.all()
    return render(request, 'client/index.html', {
        'usernames': usernames,
    })
    
# form folder views
def progess_form(request):
    usernames = User.objects.all()
    return render(request, 'client/form/form.html')

# destination folder views
def main_destination_page(request):
    usernames = User.objects.all()
    return render(request, 'client/destination/destination.html')
def particular_destination_page(request):
    usernames = User.objects.all()
    return render(request, 'client/destination/particular_destination.html')

# experiences folder views
def main_experience_page(request):
    usernames = User.objects.all()
    return render(request, 'client/experience/experience.html')

def particular_experience_page(request):
    usernames = User.objects.all()
    return render(request, 'client/experience/particular_experience.html')

def intinerary(request):
    usernames = User.objects.all()
    return render(request, 'client/experience/intinerary.html')

# journey folder views
# def main_journey_page(request):
#     usernames = User.objects.all()
#     return render(request, 'client/journey/journey.html')

# def view_journey_page(request):
#     usernames = User.objects.all()
#     return render(request, 'client/journey/view_journey_packages.html')

# def journey_details(request):
#     usernames = User.objects.all()
#     return render(request, 'client/journey/journey_details.html')

# blog folder views
def main_blog_page(request):
    usernames = User.objects.all()
    return render(request, 'client/blog/blog.html')

def read_blog_page(request):
    usernames = User.objects.all()
    return render(request, 'client/blog/read_blog.html')

# about folder views
def main_about_page(request):
    usernames = User.objects.all()
    return render(request, 'client/about/about.html')
def our_team_page(request):
    usernames = User.objects.all()
    return render(request, 'client/about/our_team.html')
def read_about(request):
    usernames = User.objects.all()
    return render(request, 'client/about/read_about.html')
def our_impact(request):
    usernames = User.objects.all()
    return render(request, 'client/about/our_impact.html')

def collaboration(request):
    usernames = User.objects.all()
    return render(request, 'client/about/collaboration.html')

def family(request):
    usernames = User.objects.all()
    return render(request, 'client/about/family.html')

# read more folder views
def read_more(request):
    usernames = User.objects.all()
    return render(request, 'client/read/read_more.html')

# shop folder urls
def shop(request):
    return render(request, 'client/shop/shop.html')

# dashboard
@login_required
def dashboard(request):
    return render(request, 'dashboard/dashboard.html')