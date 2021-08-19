import React, { Component } from 'react'

export default class APIService {
    static UpdateArticle(article_id, body) {
        return fetch(`http://127.0.0.1:8000/articles/${article_id}/`, {
            'method':'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Token b58d38490ee8d5c24751ea1ba226a3586e641907',
            },
            body:JSON.stringify(body)
        }).then(resp => resp.json())
    }
}
