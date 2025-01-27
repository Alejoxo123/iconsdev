import { Component } from '@angular/core';
import { ApiIconService } from '../../services/api-icon.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, switchMap } from 'rxjs';

@Component({
  selector: 'app-grid-icons',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './grid-icons.component.html',
  styleUrls: ['./grid-icons.component.css']
})
export class GridIconsComponent {
  iconos: any[] = []; 
  query: string = ''; 
  count: number = 100; 
  offset: number = 0; 
  selectedIcon: any | null = null; 
  availableTags: string[] = [];
  filter: string = '';
  favorites: any[] = [];
  selectedTag: string = ''; 
  categories: { name: string; tags: string[] }[] = [
    { name: 'Redes Sociales y Comunicación', tags: ['houzz', 'instagram', 'facebook', 'twitter', 'whatsapp', 'linkedin', 'youtube', 'bird', 'imo'] },
    { name: 'Iconos y Logotipos', tags: ['logo', 'brand', 'dell', 'chrome', 'google', 'netflix', 'quantcast', 'archiveofourown'] },
    { name: 'Aplicaciones y Software', tags: ['app', 'exe', 'install', 'installer', 'msi', 'setup', 'software', 'applications'] },
    { name: 'Navegación e Interfaz de Usuario', tags: ['back', 'forward', 'arrow', 'ui', 'web', 'search', 'add', 'plus'] },
    { name: 'Multimedia y Reproducción', tags: ['video', 'player', 'camera', 'photo', 'share', 'multimedia'] },
    { name: 'Comunicación y Mensajería', tags: ['email', 'envelope', 'message', 'phone', 'call', 'communication'] },
    { name: 'Educación y Aprendizaje', tags: ['book', 'learning', 'read', 'reading', 'study'] },
    { name: 'Objetivos y Éxitos', tags: ['challenge', 'flag', 'mountain', 'success', 'goal', 'target', 'achievement', 'peak'] },
    { name: 'Tiempo y Organización', tags: ['clock', 'time'] },
    { name: 'Reparación y Mantenimiento', tags: ['maintenance', 'repair', 'service'] },
    { name: 'Amor y Popularidad', tags: ['romance', 'love', 'like', 'heart', 'popular'] },
    { name: 'Favoritos y Destacados', tags: ['favorite', 'special', 'star'] },
    { name: 'Grupos y Colaboración', tags: ['collaboration', 'discussion', 'focus group', 'group discussion'] },
    { name: 'Ventas y Promociones', tags: ['sale'] },
    { name: 'Café y Bebidas', tags: ['coffee', 'cup', 'drink', 'hot', 'tea'] },
    { name: 'Elementos de Halloween', tags: ['bottle', 'halloween', 'poison', 'potion'] },
    { name: 'Hardware y Tecnología', tags: ['hardware', 'printer'] },
    { name: 'Otros', tags: ['strong', 'meet', 'complete', 'local'] },
  ];
  selectedCategory: string = '';
  

  constructor(private apiIconService: ApiIconService) { }

  ngOnInit(): void {
    this.loadIconos(); 
  }

  
  loadIconos(): void {
    this.apiIconService.getIconos(this.query, 50, 0)
      .subscribe(
        (data) => {
          console.log('Datos de los iconos:', data); 
          this.iconos = Array.isArray(data.icons) ? data.icons : [];
          this.availableTags = this.getUniqueTags(); 
          console.log('Tags disponibles:', this.availableTags); 
        },
        (error) => {
          console.error('Error al cargar los iconos', error);
        }
      );
  }
  getUniqueTags(): string[] {
    throw new Error('Method not implemented.');
  }
  

  
  onSearch(): void {
    this.apiIconService.getIconos(this.query, this.count, this.offset)
      .pipe(debounceTime(300), switchMap(() => this.apiIconService.getIconos(this.query, this.count, this.offset)))
      .subscribe(
        (data) => {
          console.log(data);
          this.iconos = Array.isArray(data.icons) ? data.icons : [];
        },
        (error) => {
          console.error('Error al cargar los iconos', error);
        }
      );
  }

  onFilterChange(event: any): void {
    this.filter = event.target.value;
  }


  toggleFavorite(icon: any): void {
    if (this.isFavorite(icon)) {
      this.favorites = this.favorites.filter((fav) => fav.icon_id !== icon.icon_id);
    } else {
      this.favorites.push(icon);
    }
  }

  isFavorite(icon: any): boolean {
    return this.favorites.some((fav) => fav.icon_id === icon.icon_id);
  }

  openModal(icon: any): void {
    this.selectedIcon = icon;
  }

  closeModal(): void {
    this.selectedIcon = null;
  }

  
  selectIcon(icon: any): void {
    this.selectedIcon = icon;
  }

  
  onDownload(iconId: string, size: number): void {
    this.apiIconService.downloadIcon(iconId, size).subscribe(
      (blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `icon-${size}.png`;  
        a.click();
        window.URL.revokeObjectURL(url);
      },
      (error) => {
        console.error('Error al descargar el icono', error);
        alert('Error al descargar el icono.');
      }
    );
  }

 
 filteredIcons(): any[] {
  if (!this.selectedCategory) {
    return this.iconos;
  }
  const selectedTags = this.categories.find(cat => cat.name === this.selectedCategory)?.tags || [];
  return this.iconos.filter(icon => icon.tags.some((tag: string) => selectedTags.includes(tag)));
}


onCategoryClick(category: string): void {
  this.selectedCategory = this.selectedCategory === category ? '' : category;
}
}
