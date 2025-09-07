import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { FormsModule, ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-musica-create',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './musica-create.html',
  styleUrls: ['./musica-create.css']
})
export class MusicaCreate {

  http = inject(HttpClient);
  router = inject(Router);

  // Mensagens de sucesso e erro
  mensagemSucesso = signal('');
  mensagemErro = signal('');

  // Formulário reativo
  form = new FormGroup({
    titulo: new FormControl('', [Validators.required]),
    artista: new FormControl('', [Validators.required]),
    album: new FormControl(''),
    ano: new FormControl('', [Validators.pattern('^[0-9]{4}$')])
  });

  // Função de submit
  onSubmit() {
    this.mensagemSucesso.set('');
    this.mensagemErro.set('');

    this.http.post('http://localhost:8080/musicas', this.form.value)
      .subscribe({
        next: (res: any) => {
          this.mensagemSucesso.set(`Música "${res.titulo}" cadastrada com sucesso!`);
          this.form.reset();
          // Redireciona para a lista de músicas
          this.router.navigate(['/musica']);
        },
        error: () => {
          this.mensagemErro.set('Falha ao cadastrar música!');
        }
      });
  }
}
