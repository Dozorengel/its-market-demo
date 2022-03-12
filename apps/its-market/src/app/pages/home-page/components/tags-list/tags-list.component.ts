import { Component, OnInit } from '@angular/core';
import { TagDTO } from '@its-market/tag';
import { ShopService } from '../../../../services/shop/shop.service';

@Component({
  selector: 'app-tags-list',
  templateUrl: './tags-list.component.html',
  styleUrls: ['./tags-list.component.css'],
})
export class TagsListComponent implements OnInit {
  tags: TagDTO[] = [] as TagDTO[];
  allTags: TagDTO[] = [] as TagDTO[];
  isShownAll = true;

  constructor(private shopService: ShopService) {}

  ngOnInit(): void {
    this.shopService.getTags().subscribe((tags) => {
      this.allTags = tags;
      this.toggle();
    });
  }

  toggle(): void {
    this.isShownAll = !this.isShownAll;
    this.tags = this.isShownAll ? this.allTags.slice(0, 5) : this.allTags;
  }
}
