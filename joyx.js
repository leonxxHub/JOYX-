-- [[" JOYX سكــربت " - الإصدار الموسيقي المتطور ]]
-- المطور: چويكس (MOHANNAD)

local CoreGui = game:GetService("CoreGui")
local TweenService = game:GetService("TweenService")
local Players = game:GetService("Players")
local RunService = game:GetService("RunService")
local ReplicatedStorage = game:GetService("ReplicatedStorage")
local lp = Players.LocalPlayer

-- 1. [ شاشة التحميل الاحترافية ]
if CoreGui:FindFirstChild("MohannadLoader") then
    CoreGui:FindFirstChild("MohannadLoader"):Destroy()
end

local LoaderGui = Instance.new("ScreenGui")
LoaderGui.Name = "MohannadLoader"
LoaderGui.Parent = CoreGui
LoaderGui.IgnoreGuiInset = true

local Background = Instance.new("Frame")
Background.Size = UDim2.new(1, 0, 1, 0)
Background.BackgroundColor3 = Color3.fromRGB(0, 0, 0)
Background.BorderSizePixel = 0
Background.Parent = LoaderGui

-- تأثير Matrix (01010)
local function CreateMatrixColumn(xPos)
    task.spawn(function()
        while LoaderGui.Parent do
            local Label = Instance.new("TextLabel")
            Label.Size = UDim2.new(0, 20, 0, 20)
            Label.Position = UDim2.new(xPos, 0, -0.1, 0)
            Label.BackgroundTransparency = 1
            Label.TextColor3 = Color3.fromRGB(0, 255, 0)
            Label.TextTransparency = 0.6
            Label.Font = Enum.Font.Code
            Label.TextSize = 15
            Label.Text = math.random(0, 1)
            Label.Parent = Background
            local fallDuration = math.random(3, 6)
            Label:TweenPosition(UDim2.new(xPos, 0, 1.1, 0), "In", "Linear", fallDuration)
            task.delay(fallDuration, function() if Label then Label:Destroy() end end)
            task.wait(math.random(0.1, 0.4))
        end
    end)
end

for i = 0, 1, 0.04 do CreateMatrixColumn(i) end

local MainContainer = Instance.new("Frame")
MainContainer.Size = UDim2.new(0, 450, 0, 250)
MainContainer.Position = UDim2.new(0.5, -225, 0.5, -125)
MainContainer.BackgroundTransparency = 1
MainContainer.Parent = Background

local LoadingText = Instance.new("TextLabel")
LoadingText.Size = UDim2.new(1, 0, 0, 50)
LoadingText.Position = UDim2.new(0, 0, 0.2, 0)
LoadingText.Text = " JOYX | جـاري الـتـحـمـيـل"
LoadingText.Font = Enum.Font.GothamBold
LoadingText.TextSize = 32
LoadingText.TextColor3 = Color3.fromRGB(0, 255, 0)
LoadingText.BackgroundTransparency = 1
LoadingText.Parent = MainContainer

local BarBack = Instance.new("Frame")
BarBack.Size = UDim2.new(0.9, 0, 0, 12)
BarBack.Position = UDim2.new(0.05, 0, 0.6, 0)
BarBack.BackgroundColor3 = Color3.fromRGB(20, 20, 20)
BarBack.BorderSizePixel = 0
BarBack.Parent = MainContainer
Instance.new("UICorner", BarBack).CornerRadius = UDim.new(1, 0)

local Glow = Instance.new("Frame")
Glow.Size = UDim2.new(0, 0, 1, 4)
Glow.Position = UDim2.new(0, 0, 0, -2)
Glow.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
Glow.BackgroundTransparency = 0.7
Glow.BorderSizePixel = 0
Glow.Parent = BarBack
Instance.new("UICorner", Glow).CornerRadius = UDim.new(1, 0)

local BarFill = Instance.new("Frame")
BarFill.Size = UDim2.new(0, 0, 1, 0)
BarFill.BackgroundColor3 = Color3.fromRGB(0, 255, 0)
BarFill.BorderSizePixel = 0
BarFill.Parent = BarBack
Instance.new("UICorner", BarFill).CornerRadius = UDim.new(1, 0)

local PercentText = Instance.new("TextLabel")
PercentText.Size = UDim2.new(1, 0, 0, 30)
PercentText.Position = UDim2.new(0, 0, 0.75, 0)
PercentText.Text = "0%"
PercentText.Font = Enum.Font.GothamMedium
PercentText.TextSize = 22
PercentText.TextColor3 = Color3.fromRGB(255, 255, 255)
PercentText.BackgroundTransparency = 1
PercentText.Parent = MainContainer

local FinishedLoading = false

task.spawn(function()
    local progress = 0
    while progress < 100 do
        progress = progress + math.random(2, 5)
        if progress > 100 then progress = 100 end
        local tweenInfo = TweenInfo.new(0.3, Enum.EasingStyle.Linear)
        TweenService:Create(BarFill, tweenInfo, {Size = UDim2.new(progress/100, 0, 1, 0)}):Play()
        TweenService:Create(Glow, tweenInfo, {Size = UDim2.new(progress/100, 0, 1, 4)}):Play()
        PercentText.Text = progress .. "%"
        task.wait(math.random(0.05, 0.12))
    end
    
    LoadingText.Text = "تـم تـشـغـيـل الـنـظـام!"
    task.wait(0.5)
    
    local tweenInfoOut = TweenInfo.new(1, Enum.EasingStyle.Quart, Enum.EasingDirection.Out)
    local bgTween = TweenService:Create(Background, tweenInfoOut, {BackgroundTransparency = 1})
    bgTween:Play()

    for _, v in pairs(MainContainer:GetDescendants()) do
        if v:IsA("TextLabel") then
            TweenService:Create(v, TweenInfo.new(0.5), {TextTransparency = 1}):Play()
        elseif v:IsA("Frame") then
            TweenService:Create(v, TweenInfo.new(0.5), {BackgroundTransparency = 1}):Play()
        end
    end
    
    bgTween.Completed:Wait()
    LoaderGui:Destroy()
    FinishedLoading = true
end)

repeat task.wait() until FinishedLoading == true

-- 2. [ تشغيل سكربت مهند الأساسي ]
local RE = ReplicatedStorage:WaitForChild("RE", 5)
local Remotes = ReplicatedStorage:WaitForChild("Remotes", 5)

local function WearItem(id)
    pcall(function() Remotes.Wear:InvokeServer(tonumber(id)) end)
end

local Rayfield = loadstring(game:HttpGet('https://sirius.menu/rayfield'))()

local Window = Rayfield:CreateWindow({
   Name = "چويكس  | JOYX",
   LoadingTitle = "جاري فتح الواجهة الرئيسية...",
   LoadingSubtitle = "By JOYX",
   ConfigurationSaving = { Enabled = true, FolderName = "SpookiFresh" }
})

-- نظام الـ RP الملون
task.spawn(function()
    pcall(function()
        if RE then
            local NameText = RE:WaitForChild("1RPNam1eTex1t", 5)
            local NameColor = RE:WaitForChild("1RPNam1eColo1r", 5)
            NameText:FireServer("RolePlayName",JOYX ")
            NameText:FireServer("RolePlayBio", "تم تطوير السكربت من قبل چويكس")
            local hue = 0
            while true do
                hue = (hue + 0.01) % 1
                local color = Color3.fromHSV(hue, 1, 1)
                NameColor:FireServer("PickingRPNameColor", color)
                NameColor:FireServer("PickingRPBioColor", color)
                task.wait(0.05)
            end
        end
    end)
end)

-- [ التبويبات ]

-- 1. تبويب الرؤوس
local HeadsTab = Window:CreateTab("الـرؤوس", 4483362458)
HeadsTab:CreateSection("الرؤوس المطلوبة")
HeadsTab:CreateButton({Name="رأس الـفـضـائـي", Callback=function() WearItem(3210773801) end}) 
HeadsTab:CreateButton({Name="رأس مـخـفـي", Callback=function() WearItem(134082579) end})

-- 2. تبويب أكواد الملابس
local ClothingTab = Window:CreateTab("اكـواد مـلابـس", 4483362458)

ClothingTab:CreateSection("اكـمام الـيد")
ClothingTab:CreateButton({Name="قـفازات يد اسود مخطط", Callback=function() WearItem(9239689111) end})
ClothingTab:CreateButton({Name="سـتـرة اسـود", Callback=function() WearItem(89892588488089) end})
ClothingTab:CreateButton({Name="سـتـرة زهـري كـيـوت", Callback=function() WearItem(99429391843259) end})
ClothingTab:CreateButton({Name="قـفازات يد اسود عـادي 1", Callback=function() WearItem(10789914680) end})
ClothingTab:CreateButton({Name="قـفازات يد اسود عـادي 2", Callback=function() WearItem(11363898043) end})
ClothingTab:CreateButton({Name="قـفازات يد اسود عـادي 3", Callback=function() WearItem(10791180072) end})
ClothingTab:CreateButton({Name="قـفازات يد ابـيـض مزخرف", Callback=function() WearItem(10871965173) end})
ClothingTab:CreateButton({Name="قـفازات يد زهري", Callback=function() WearItem(10789939838) end})
ClothingTab:CreateButton({Name="قـفازات يد احـمـر", Callback=function() WearItem(12379676852) end})
ClothingTab:CreateButton({Name="اضـافـر اسـود", Callback=function() WearItem(12825022709) end})

ClothingTab:CreateSection("اكـمام الرجـل")
ClothingTab:CreateButton({Name="حـذاء الـشيطـان زهري", Callback=function() WearItem(14388006902) end})
ClothingTab:CreateButton({Name="حـذاء الـشيطـان احـمـر", Callback=function() WearItem(14388019333) end})
ClothingTab:CreateButton({Name="حـذاء الـشيطـان ابـيض", Callback=function() WearItem(14387999337) end})
ClothingTab:CreateButton({Name="حـذاء الـشيطـان اسـود", Callback=function() WearItem(14388004031) end})
ClothingTab:CreateButton({Name="حـذاء طـويل اسـود", Callback=function() WearItem(11433864064) end})
ClothingTab:CreateButton({Name="حـذاء طـويل ابـيض", Callback=function() WearItem(11111279400) end})
ClothingTab:CreateButton({Name="حـذاء طـويل ابـيض و احـمر", Callback=function() WearItem(11708887517) end})

ClothingTab:CreateSection("اشـياء للـيـد")
ClothingTab:CreateButton({Name="ورد اسـود", Callback=function() WearItem(12465465333) end})
ClothingTab:CreateButton({Name="ورد ابـيض", Callback=function() WearItem(12465472210) end})
ClothingTab:CreateButton({Name="ورد احـمـر", Callback=function() WearItem(12465376206) end})

ClothingTab:CreateSection("الاشـواك")
ClothingTab:CreateButton({Name="شـوك 1", Callback=function() WearItem(13463287248) end})
ClothingTab:CreateButton({Name="شـوك 2", Callback=function() WearItem(3463272877) end})
ClothingTab:CreateButton({Name="شـوك 4", Callback=function() WearItem(13463355223) end})

ClothingTab:CreateSection("مـلابـس كـيـوت")
ClothingTab:CreateButton({Name="لـبـس كـيـوت 1", Callback=function() WearItem(84110484978046) end})
ClothingTab:CreateButton({Name="لـبـس كـيـوت 2", Callback=function() WearItem(75698084918608) end})

-- 3. تبويب الأغاني
local MusicTab = Window:CreateTab("اغاني الفونك", 4483362458)
local function playMusic(id)
    pcall(function()
        RE:FindFirstChild("1NoMoto1rVehicle1s"):FireServer("SkateBoard")
        task.wait(0.3)
        RE:FindFirstChild("1NoMoto1rVehicle1s"):FireServer("PickingScooterMusicText", tostring(id))
    end)
end

MusicTab:CreateSection("تـشـغـيـل كـود خـاص")
MusicTab:CreateInput({
   Name = "أدخل ID الأغنية هنا",
   PlaceholderText = "مثال: 17647322226",
   RemoveTextAfterFocusLost = false,
   Callback = function(Text)
       if tonumber(Text) then
           playMusic(Text)
           Rayfield:Notify({Title = "جاري التشغيل", Content = "تم إرسال الكود: " .. Text, Duration = 2})
       end
   end,
})

MusicTab:CreateSection("قائمة الأغاني الكاملة (31)")
local songs = {
    {"افخم فونك", "17647322226"}, {"فونك غضب", "115859025716354"}, {"فونك 5x30", "73966367524216"},
    {"فونك عالمي", "76578817848504"}, {"فونك تيك توك", "93218265275853"}, {"فونك ممتاز", "102402883551679"},
    {"جرب وما تندم 1", "81023003196738"}, {"جرب وما تندم 2", "134833118817796"}, {"جرب وما تندم 3", "131794008455004"},
    {"جرب وما تندم 4", "80281881556916"}, {"جرب وما تندم 5", "91611648163631"}, {"جرب وما تندم 6", "140498577577255"},
    {"جرب وما تندم 7", "103288558732219"}, {"جرب وما تندم 8", "97647421021323"}, {"جرب وما تندم 9", "105438850576001"},
    {"جرب وما تندم 10", "94943308357738"}, {"جرب وما تندم 11", "7942547789"}, {"جرب وما تندم 12", "6713993281"},
    {"جرب وما تندم 13", "99113135294997"}, {"جرب وما تندم 14", "77446238713316"}, {"جرب وما تندم 15", "5849978429"},
    {"جرب وما تندم 16", "78162685107156"}, {"جرب وما تندم 17", "97527941489881"}, {"جرب وما تندم 18", "137441889952684"},
    {"جرب وما تندم 19", "6536444735"}, {"جرب وما تندم 20", "134954359122953"}, {"جرب وما تندم 21", "112355709978731"},
    {"جرب وما تندم 22", "81130579221281"}, {"جرب وما تندم 23", "127491720343331"}, {"جرب وما تندم 24", "111654307080397"},
    {"جرب وما تندم 25", "102655780019271"}, {"جرب وما تندم 26", "98313375960954"}, {"جرب وما تندم 27", "126128443619187"},
    {"جرب وما تندم 28", "80469096504953"}, {"جرب وما تندم 29", "136909019669593"}, {"جرب وما تندم 30", "117909139728666"},
    {"جرب وما تندم 31", "94943308357738"}
}
for _, s in ipairs(songs) do
    MusicTab:CreateButton({Name = s[1], Callback = function() playMusic(s[2]) end})
end

-- 4. [ تبويب سكربتات تهمك ]
local ScriptsTab = Window:CreateTab("سكربتات تهمك", 4483362458)

ScriptsTab:CreateButton({
    Name = "سكربت رقضات",
    Callback = function()
        loadstring(game:HttpGet("https://rawscripts.net/raw/Universal-Script-Gaze-emote-74592"))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربت الهلال",
    Callback = function()
        loadstring(game:HttpGet('https://raw.githubusercontent.com/Ndora1/Ndora1/main/Nokia%20Hub.lua'))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربت الفا",
    Callback = function()
        loadstring(game:HttpGet("https://rawscripts.net/raw/Universal-Script-ALFA-IRAQ-34036"))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربت VR7",
    Callback = function()
        loadstring(game:HttpGet("https://rawscripts.net/raw/Universal-Script-VR7-45290"))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربت شات",
    Callback = function()
        loadstring(game:HttpGet("https://rawscripts.net/raw/Brookhaven-RP-Mickey-Chat-85762"))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربت LOC4T",
    Callback = function()
        loadstring(game:HttpGet("https://rawscripts.net/raw/Brookhaven-RP-LOC4T-HUB-111999"))()
    end
})

ScriptsTab:CreateButton({
    Name = "سكربتي JOYX HUB بروك هافن ",
    Callback = function()
        loadstring(game:HttpGet("https://raw.githubusercontent.com/leonxxHub/JOYX-/refs/heads/main/obfuscated_script-1777390862827.lua.txt"))()
    end
})

-- 5. تبويب الحقوق
local CreditTab = Window:CreateTab("الحقوق", 4483362458)
CreditTab:CreateSection ( "JOYX" ")
CreditTab:CreateLabel("المطور الرئيسي: چويكس")

Rayfield:Notify({
   Title = "JOYX"  ",
   Content = "تم إضافة تبويب السكربتات الجديدة بنجاح  !",
   Duration = 5
})