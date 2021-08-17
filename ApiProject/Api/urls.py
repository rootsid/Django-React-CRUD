from django.contrib import admin
from django.urls import path, include
# from .views import home, article_list, article_details
from .views import home, ArticleList, ArticleDetails, UserRegisteration

urlpatterns = [
    # path('articles', article_list),
    # path('articles/<int:pk>/', article_details)
    path('articles/', ArticleList.as_view()),
    path('articles/<int:pk>/', ArticleDetails.as_view()),
    path('users/', UserRegisteration.as_view())
]