export {Components, JSX} from './components';

interface ItemConfig {
  type: string,
  title: string,
  icon: string,
  progress: boolean
  cooldown: number
  description?: string
  actions: Array<HTMLButtonElement>
}

interface ToastConfigInterface {
  theme: string
  placement: string
}

export class Toast {
  private toastWrapper: HTMLElement

  constructor(toastWrapperConfig: ToastConfigInterface) {
    this.toastWrapper = document.querySelector('ctt-toast')
    if (!this.toastWrapper) {
      const body = document.querySelector('body')
      this.toastWrapper = this.createToastWrapper(toastWrapperConfig)
      body.append(this.toastWrapper)
    }
  }

  private createToastWrapper(toastWrapperConfig: ToastConfigInterface): HTMLElement {
    const toastWrapper = document.createElement('ctt-toast')
    toastWrapper.setAttribute('data-theme', toastWrapperConfig.theme)
    toastWrapper.setAttribute('data-placement', toastWrapperConfig.placement)
    return toastWrapper
  }

  public emit(itemConfig: ItemConfig): void {
    const item = this.createItem(itemConfig)
    this.toastWrapper.appendChild(item)
  }

  private createItem(itemConfig: ItemConfig): HTMLElement {
    const item = document.createElement('ctt-toast-item');
    item.innerHTML = ''
    item.setAttribute('type', itemConfig.type)
    item.setAttribute('toast-title', itemConfig.title)
    item.setAttribute('progress', itemConfig.progress.toString())
    item.setAttribute('cooldown', itemConfig.cooldown.toString())
    if (itemConfig.icon == null) {
      itemConfig.icon = `fi flaticon-${itemConfig.type}`
    }
    if (itemConfig.description) {
      item.innerHTML = itemConfig.description
      item.setAttribute('has-description', 'true')
    }

    item.setAttribute('icon', itemConfig.icon)
    if (itemConfig.actions && itemConfig.actions.length > 0) {
      const actions = this.createSlotActions([...itemConfig.actions])
      item.append(actions)
    }
    return item
  }

  private createSlotActions(actions: Array<HTMLElement>) {
    let slotActions = document.createElement('div')
    slotActions.setAttribute('slot', 'actions')
    actions.map((action) => {
      slotActions.appendChild(action.cloneNode(true))
    })
    return slotActions
  }
}

