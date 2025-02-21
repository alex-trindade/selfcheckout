import yt_dlp

def download_video(url, output_path='.'):
    try:
        # Configurações para o youtube-dl
        ydl_opts = {
            'format': 'best',  # Baixa a melhor qualidade disponível
            'outtmpl': f'{output_path}/%(title)s.%(ext)s',  # Define o caminho de saída
            'quiet': False,  # Exibe logs no console
        }

        # Inicia o download
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            print(f"Iniciando o download do vídeo...")
            ydl.download([url])
            print("Download concluído com sucesso!")
    except Exception as e:
        print(f"Ocorreu um erro: {e}")

if __name__ == "__main__":
    # URL do vídeo que você deseja baixar
    video_url = input("Cole a URL do vídeo do YouTube: ")

    # Pasta onde o vídeo será salvo (opcional, padrão é a pasta atual)
    #output_folder = input("Digite o caminho da pasta para salvar o vídeo (deixe em branco para a pasta atual): ") or '.'

    # Chama a função para fazer o download
    download_video(video_url)