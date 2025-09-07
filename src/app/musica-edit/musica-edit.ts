import { CommonModule } from '@angular/common';
import { Component, inject, signal, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-musica-edit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterLink
  ],
  templateUrl: './musica-edit.html',
  styleUrls: ['./musica-edit.css']
})
export class MusicaEdit implements OnInit {

  http = inject(HttpClient);
  router = inject(Router);
  route = inject(ActivatedRoute);

  mensagemSucesso = signal('');
  mensagemErro = signal('');

  form = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    artista: new FormControl('', [Validators.required]),
    album: new FormControl(''),
    ano: new FormControl('', [Validators.pattern('^[0-9]{4}$')])
  });

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.get(`http://localhost:8080/musicas/${id}`)
        .subscribe({
          next: (res: any) => this.form.setValue({
            titulo: res.titulo || '',
            artista: res.artista || '',
            album: res.album || '',
            ano: res.ano || ''
          }),
          error: () => this.mensagemErro.set('Falha ao carregar música!')
        });
    }
  }

  onSubmit() {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.http.put(`http://localhost:8080/musicas/${id}`, this.form.value)
        .subscribe({
          next: (res: any) => {
            this.mensagemSucesso.set(`Música "${res.titulo}" atualizada com sucesso!`);
            // Redireciona para a lista
            this.router.navigate(['/musica']);
          },
          error: () => this.mensagemErro.set('Falha ao atualizar música!')
        });
    }
  }
}
