import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-musica',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './musica.html',
  styleUrls: ['./musica.css']
})
export class Musica implements OnInit {

  http = inject(HttpClient);

  // Lista de músicas
  musicas = signal<any[]>([]);
  mensagemErro = signal('');

  ngOnInit() {
    this.carregarMusicas();
  }

  carregarMusicas() {
    this.http.get('http://localhost:8080/musicas')
      .subscribe({
        next: (res: any) => this.musicas.set(res),
        error: () => this.mensagemErro.set('Falha ao carregar músicas!')
      });
  }

  deletarMusica(id: number) {
    this.http.delete(`http://localhost:8080/musicas/${id}`)
      .subscribe({
        next: () => {
          this.musicas.set(this.musicas().filter(m => m.id !== id));
        },
        error: () => this.mensagemErro.set('Falha ao deletar música!')
      });
  }
}
