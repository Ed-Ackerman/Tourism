# views.py
from django.contrib import messages
from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login as auth_login  
from django.contrib.auth import logout as auth_logout
from django.db.models import Q
from django.contrib.auth.decorators import login_required

   
def signup(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        email = request.POST.get('email')
        password = request.POST.get('password')
        confirm_password = request.POST.get('confirm_password')
        remember_me = request.POST.get('remember_me')

        # Check if the username already exists
        if User.objects.filter(username=username).exists():
            messages.error(request, 'Username is already taken. Please choose another.')
            return render(request, 'authentication/signup.html')

        # Check if the passwords match
        if password != confirm_password:
            messages.error(request, 'Passwords do not match.')
            return render(request, 'authentication/signup.html')

        # Create a new user (you may want to add additional validation and error handling)
        user = User.objects.create_user(username=username, email=email, password=password, is_staff=False)

        # Log the user in
        user = authenticate(request, username=username, password=password)
        if user:
            # Check the status of the "Remember Me" checkbox
            if not remember_me:
                # If "Remember Me" is not checked, set session expiration to 0 (session cookie)
                request.session.set_expiry(0)

            auth_login(request, user)  # Use auth_login instead of login
            # messages.success(request, 'Account created successfully. You are now logged in.')
            return redirect('client:index')

    return render(request, 'authentication/signup.html')


def login(request):
    if request.method == 'POST':
        username_or_email = request.POST.get('username')
        password = request.POST.get('password')
        remember_me = request.POST.get('remember_me')
        
        # Try to authenticate by both username and email
        user = authenticate(request, username=username_or_email, password=password)

        if user is None:
            # If authentication fails with username, try with email
            user = User.objects.filter(Q(username=username_or_email) | Q(email=username_or_email)).first()
            if user:
                user = authenticate(request, username=user.username, password=password)

        if user is not None:
            auth_login(request, user)
            
            # Check the status of the "Remember Me" checkbox
            if not remember_me:
                # If "Remember Me" is not checked, set session expiration to 0 (session cookie)
                request.session.set_expiry(0)

            # messages.success(request, 'Login successful.')
            return redirect('client:index')
        else:
            messages.error(request, 'Invalid login credentials.')

    return render(request, 'authentication/login.html')


def logout(request):
    auth_logout(request)
    return redirect('client:index')

   
